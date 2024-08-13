---
title: Value your CDR with Machine learning
date: 2021-09-17 17:00:00
authors: tboyer
category: Wazo Platform
tags: [asterisk, applications, stasis, scalability, machine-learning, data-science]
slug: value-cdr-machine-learning
status: published
---

The CDR service allows you to keep track of the activity going on your stack. It's a data source that could be valuable in numerous ways. In this article, we will see how to make value out of your CDR using machine learning.

<!-- truncate -->

## Why machine learning

Machine learning is a set of methods based on computing and statistics, to allow so-called _models_ to learn the mapping between two statistical variables. It is often used to automate tasks that can't be programmed by hand, like recognizing objects in an image.
Thereby machine learning allows you to automate tasks that you wouldn't have been able to.
In the present article, we will take as an example a task consisting of predicting the probability that a person will pick up a given call.

## The CDR dataset

Like all machine learning tasks, we need a so-called _dataset_ which is in our case a dump of the CDR into a CSV file.
The CDR is a _tabular dataset_, meaning that we have rows or _occurrences_, and columns or _variables_. In the case of the CDR, each row is a call, and each column is an attribute of the calls.
The columns are the following:

| Field                          | Format     | Description                                                                |
| ------------------------------ | ---------- | -------------------------------------------------------------------------- |
| id                             | _integer_  | Unique identifier                                                          |
| tenant_uuid                    | _string_   | Unique identifier for the location                                         |
| answered                       | _boolean_  |
| start                          | _datetime_ | Date and time when the call landed on the system                           |
| answer                         | _datetime_ | Date and time when the call was answered (empty if called wasn't answered) |
| end                            | _datetime_ | Date and time when the call was hung up                                    |
| destination_extension          | _string_   | Extension (internal id or phone number) of the destination                 |
| destination_name               | _string_   | Name of the destination                                                    |
| destination_internal_extension | _integer_  | Internal extension of the destination                                      |
| destination_internal_context   | _string_   | Internal context used                                                      |
| destination_user_uuid          | _string_   | Unique identifier of the reached user                                      |
| destination_line_id            | _integer_  | User line reached                                                          |
| duration                       | _integer_  | Call duration                                                              |
| call_direction                 | _string_   | Direction of the call (internal, inbound, outbound)                        |
| requested_name                 | _string_   | Dialed name                                                                |
| requested_extension            | _string_   | Dialed extension (internal id or phone number) of the requested agent      |
| requested_context              | _string_   | Context corresponding of the requested number                              |
| requested_internal_extension   | _integer_  | Internal extension corresponding to the request                            |
| requested_internal_context     | _string_   | Internal context corresponding to the request                              |
| source_extension               | _string_   | Caller extension (internal id or phone number) of the source agent         |
| source_name                    | _string_   | Caller name                                                                |
| source_internal_extension      | _string_   | Caller internal extension                                                  |
| source_internal_context        | _integer_  | Caller internal context                                                    |
| source_user_uuid               | _string_   | Caller UUID                                                                |
| source_line_id                 | _integer_  | Id of the caller line                                                      |

## Processing the data

The data processing step is by far the most important one in the entire procedure, and will certainly be well elaborated to end up with good models.

### Type of variables

In the case of tabular data, we have to make sure that each variable's type that we use in our dataset is one of:

- Numerical, meaning that a variable is a float number, as the duration of a call in seconds for example
- Categorical, meaning that the variable will have values from a given ensemble, like the day of the week, or the phone number of the person that called

### Handling missing values

In every dataset from the real world, there are sometimes missing values. It can be accidental (for example if a bug happened during the saving of the CDR ) or intentional, meaning that it doesn't make sense for this variable to have a value for this call (for example, `source_internal_extension` whenever the call is coming from outside the stack).
For some models, you will need to handle them, for others you won't need to.
To handle a missing value, you can either drop the concerned row/column or replace it with a carefully chosen one. This choice depends on the variable's type:

- For a numerical column, you may want to choose the mean/median value of the variable or zero in some cases
- For a categorical column, you may want to choose the most frequent value or create a new category that includes all missing values.
  There is no perfect solution to handle NaN values, it's essentially about testing what does work and what does not.

### Feature engineering

It's possible to improve the performances of the model via _feature engineering_. This consists of using the existing columns of a dataset to craft new columns that will help the model to learn.
For our example application, here are some engineered features that might help our model:

| Feature                 | Format    | Description                                                                         |
| ----------------------- | --------- | ----------------------------------------------------------------------------------- |
| TimeOfDay               | _float_   | Numerical variable representing the hour normalized between 0 and 1                 |
| DayOfWeek               | _integer_ | Category variable representing which day of the week the call was placed            |
| Hour                    | _integer_ | Category variable representing which hour of the day the call was placed            |
| DestinationContainsStar | _boolean_ | Categorical variable representing whether the destination extension contains a star |

When crafting new features, make sure to use variables that you will be able to access when serving the model

## Models

There are tons of models that we can use to fit our dataset. We'll quickly introduce the most popular ones. You can easily find and tune those models using the [scikit](https://scikit-learn.org/stable/) learn library

![scikit.png](../static/images/blog/machine-learning/scikit.png 'Scikit logo')

### Linear model

Linear models come directly from statistics. They aren't complex models, but they can achieve good performance for a lot of problems. Furthermore, linear models can be fitted without crazy hardware requirements and are very well manageable in production.

### Tree-based methods

Tree-based methods, as their name suggests are based on decision trees. They are a bit harder to fit well because they can be subject to overfitting quite easily. You can tune quite a few parameters and must avoid [overfitting](https://en.wikipedia.org/wiki/Overfitting). The most popular tree-based algorithms are the Random Forest and the Gradient Boosting algorithms.

### Neural Networks

Neural networks are very popular in machine learning. However, they are difficult to tune on tabular data and often less efficient than tree-based methods. But for large datasets, they are an option you may want to consider.

![neural-net.png](../static/images/blog/machine-learning/neural-net.png 'Neural network pattern')

## Testing

A good testing methodology is crucial to estimate the performances of your models. You should be very careful when designing a test pipeline because it's very easy to bias your results.
For example, feature engineering can be a source of information leakage.
A typical example is a normalization operation: to compute the mean and standard deviation of a variable, you should use your training samples only.

### Cross-validation

The first good practice is to perform [cross-validation](<https://en.wikipedia.org/wiki/Cross-validation_(statistics)>). This method allows you to test your model on unseen data while maximizing the use of your data samples. This is especially important if you have a small dataset. Furthermore, the final metric will be based on multiple random seeds, avoiding "lucky" seeds.

### Metrics

The metrics that you can use depend on the task you want to achieve.
For classification, you may use [accuracy, precision](https://en.wikipedia.org/wiki/Accuracy_and_precision), [F1](https://en.wikipedia.org/wiki/F-score), or [AUC ROC](https://fr.wikipedia.org/wiki/Courbe_ROC)
For regression you may want to use [MSE](https://en.wikipedia.org/wiki/Mean_squared_error), [RMSE](https://en.wikipedia.org/wiki/Root-mean-square_deviation)

## Deploying models

The most frequent way to deploy models is to serve them through an API. Numerous frameworks exist to fulfill this purpose. One of the most popular is Flask as it is very simple and quick to serve ml models using it.

![flask.png](../static/images/blog/machine-learning/flask.png 'Flask logo')
