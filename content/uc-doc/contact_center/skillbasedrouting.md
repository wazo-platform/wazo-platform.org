---
title: 'Skills-Based Routing'
---

## Introduction

> _Skills-based routing (SBR), or Skills-based call routing, is a call-assignment strategy used in
> call centres to assign incoming calls to the most suitable agent, instead of simply choosing the
> next available agent. It is an enhancement to the Automatic Call Distributor (ACD) systems found
> in most call centres. The need for skills-based routing has arisen, as call centres have become
> larger and dealt with a wider variety of call types._
>
> -- Wikipedia

In this respect, skills-based routing is also based on call distribution to agents through waiting
queues, but one or many skills can be assigned to each agent, and call can be distributed to the
most suitable agent.

In skills-based routing, you will have to find a way to be able to tag the call for a specific skill
need. This can be done for example by entering the call distribution system using different incoming
call numbers, using an IVR to let the caller do his own choice, or by requesting to the information
system database the customer profile.

![Skills-Based Routing](/images/uc-doc/contact_center/skillbasedrouting/sbr_introduction.png)

## Getting Started

- Create the skills
- Apply the skills to the agents
- Create the skill rule sets
- Assign the skill rule sets using a configuration file
- Apply the skill rule sets to call qualification

Note that you shouldn't use skill based routing on a queue with queue members of type user because
the behaviour is not defined and might change in a future Wazo version.

## Skills

Skills are created using:

- `POST /agents/skills`

Once all the skills are created you may apply them to agents. Agents may have one or more skills.

- `PUT /agents/{agent_id}/skills/{skill_id} {"skill_weight": 55}`

It is typical to use a value between 0 and 100 inclusively as the `skill_weight`, although any
integer is accepted.

## Skill Rule Sets

Once skills are created, rule sets can be defined.

- `POST /queues/skillrules`

A rule set is a list of rules. Here's an example of a rule set containing 2 rules:

1. `WT < 60, english > 50`
2. `english > 0`

The first rule of this rule set can be read as:

> If the caller has been waiting for less than 60 seconds (`WT < 60`), only try to call agents which
> have the skill `english` set to a value higher than `50`; otherwise, go to the next rule.

And the second rule can be read as:

> Only try to call agents which have the skill `english` set to a value higher than `0`.

Let's examine some simple scenarios, because there's actually some subtleties on how calls are
distributed. We will suppose that we have a queue with the default settings and the following
members:

- Agent A, with skill `english` set to `75`
- Agent B, with skill `english` set to `25`

### Scenario 1

Given:

- Agent A is logged and not in use
- Agent B is logged and not in use
- There is no call in the queue

When a new call enters the queue, then it is distributed to Agent A. As long as Agent A is available
and doesn't answer the call, the call will never be distributed to Agent B, even after 60 seconds of
waiting time.

When another call enters the queue, then after 60 seconds of waiting time, this call will be
distributed to Agent B (and the first call will still be distributed only to Agent A).

The reason is that there's a difference between a call that is being distributed (i.e. that is
making agents ring) and a call that is waiting for being distributed. When a call is being
distributed to a set of members, no other rule is tried as long as there's at least 1 of these
members available.

### Scenario 2

Given:

- Agent A is not logged
- Agent B is logged and not in use
- There is no call in the queue

When a new call enters the queue, then it is _immediately_ distributed to Agent B.

The reason is that when there's no logged agent matching a rule, the next rule is immediately tried.

### Rules

Each rule set is composed of rules, and each rule has two parts, separated by a comma:

- the first part (optional) is the
  ["dynamic part"](/uc-doc/contact_center/skillbasedrouting#skill-dynamic-part)
- the second part is the ["skill part"](/uc-doc/contact_center/skillbasedrouting#skill-skill-part)

Each part contains an expression composed of operators, variables and integer constants.

### Operators

The following operators can be used inside rules:

Comparison operators:

- `operand1 ! operand2` (is not equal)
- `operand1 = operand2` (is equal)
- `operand1 > operand2` (is greater than)
- `operand1 < operand2` (is lesser than)

Logical operators:

- `operand1 & operand2` (both are true)
- `operand1 | operand2` (at least one of them are true)

`!` is the operator with the higher priority, and `|` the one with the lower priority. You can use
parentheses `()` to change the priority of operations.

### Dynamic Part {#skill-dynamic-part}

The dynamic part can reference the following variables:

- `WT`
- `EWT`

The waiting time (`WT`) is the elapsed time since the call entered the queue. The time the call pass
in an IVR or another queue is not taken into account.

The estimated waiting time (`EWT`) has never fully worked. It is mentioned here only for historical
reason. You should not use it. It might be removed in a future Wazo version.

Examples:

- `WT < 60`

### Skill Part {#skill-skill-part}

The skill part can reference any skills name as variables.

You can also use meta-variables, starting with a `$`, to substitute them with data set on the
`Queue()` call. For example, if you call `Queue()` with the skill rule set argument equal to:

```
select_lang(lang=german)
```

Then every `$lang` occurrence will be replaced by `german`.

Examples:

- `english > 50`
- `technic ! 0 & ($os > 29 & $lang > 39 | $os > 39 & $lang > 19)`

### Evaluation {#skill-evaluation}

Note that the expression:

- `english | french`

is equivalent to:

- `english ! 0 | french ! 0`

Sometimes, a rule references a skill which is not defined for every agent. For example, given the
following rule:

- `english > 0 | english < 1`

Then, for an agent which has the skill `english` defined, the result of this expression is always
true. For an agent which does not have the skill `english` defined, the result of this expression is
always false.

Said differently, an agent without a skill X is not the same as an agent with the skill X set to the
value 0.

Technically, this is what is happening when evaluating the rule `english > 0` for an agent without
the skill `english`:

```
  english > 0
= <Substituing english with the agent value>
  "undefined" > 0
= <A comparison with "undefined" in at least one operand yields undefined>
  "undefined"
= <In a boolean context, "undefined" is equal to false>
  false
```

This behaviour applies to every comparison operators.

Also, the syntax that is currently accepted for comparison is always of the form:

```
variable cmp_op constant
```

Where `variable` is a variable name, `cmp_op` is a comparison operator and `constant` is an integer
constant. This means the following expressions are not accepted:

- `10 < english` (but `english > 10` is accepted)
- `english < french` (the second operand must be a constant)
- `10 < 11` (the first operand must be a variable name)

## Apply Skill Rule Sets {#skill-apply}

A skill rule set is attached to a call using an incoming call.

- `POST incalls {"destination": {"type": "queue", "skill_rule_id": <id>, "skill_rule_variables": {"lang": "english"}}}`
- `POST incalls {"destination": {"type": "queue", "skill_rule_id": <id>, "skill_rule_variables": {"lang": "french"}}}`

## Monitoring

You may monitor your waiting calls with skills using the asterisk CLI and the command
`queue show <queue_name>`:

```asterisk
wazo*CLI> queue show services
services has 1 calls (max unlimited) in 'ringall' strategy (0s holdtime, 2s talktime), W:0, C:1, A:10, SL:0.0% within 0s
  Members:
     Agent/2000 (Not in use) (skills: agent-1) has taken no calls yet
     Agent/2001 (Unavailable) (skills: agent-4) has taken no calls yet
  Virtual queue english:
  Virtual queue french:
     1. SIP/jyl-dev-assur-00000017 (wait: 0:05, prio: 0)
  Callers:
```

You may monitor your skills groups with the command `queue show skills groups <agent_name>`:

```asterisk
wazo*CLI> queue show skills groups <PRESS TAB>
agent-2   agent-3   agent-4   agent-48  agent-7   agent-1
wazo*CLI> queue show skills groups agent-1
Skill group 'agent-1':
  - bank           : 50
  - english        : 100
```

You may monitor your skills rules with the command `queue show skills rules <rule_name>`:

```asterisk
wazo*CLI> queue show skills rules <PRESS TAB>
english      french       select_lang
wazo*CLI> queue show skills rules english
Skill rules 'english':
  => english>90
```
