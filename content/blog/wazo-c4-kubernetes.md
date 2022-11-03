---
title: Wazo Platform C4 now deployable on Kubernetes
date: 2019-11-26
author: Fabio Tranchitella and Aleksandar Sosic
category: Wazo Platform C4
tags: wazo-platform, c4, kubernetes, docker, cloud
slug: wazo-platform-c4-on-kubernetes
status: published
---


# Wazo Platform C4 now deployable on Kubernetes


## Introduction
As already mentioned We're focused on delivering a Cloud-Native telecom solution with all the bells and whistles in the next months. The [Cloud Native Computing Foundation](https://github.com/cncf/toc/blob/master/DEFINITION.md) defines:

```Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach.```

In our pursuit of enabling companies to build their IP communication infrastructure and deliver innovative communication services with our open-source, API-centric solutions we could not avoid enabling our users to deploy Wazo Platform on a cloud solution as easy as possible.

We started with a deployment of our C4 (Class 4) SBC and routing solution on a Kubernetes Cluster through a Helm chart.


## Wazo Platform C4 solution
We've already introduced our C4 platform in a recent [blog post](/blog/wazo-platform-c4-overview). Our SBC and Routing solution has in the last month grown and matured with the introduction of RTP Engine, Consul and the automatic configuration of Kamailio nodes as the architecture scales. It is a fairly new project of ours but we've done giant leaps toward a complete C4 solution just in the last weeks.

Our [Docker Compose repository](https://github.com/wazo-platform/wazo-c4) that ties these components together has received a cleanup and improvement and at this point, we knew we could run Wazo Platform C4 in a Kubernetes Cluster.


## What is Kubernetes?
In the myriad of buzzwords you've probably heard `Kubernetes` (abbreviated as K8S) in a cloud infrastructure context multiple times, but what is Kubernetes?

Kubernetes is a Greek word which means "helmsman" - the pilot of a ship.

The definition of the [official repository](https://github.com/kubernetes/kubernetes/) states that Kubernetes is an open-source container-orchestration system for automating application deployment, scaling, and management.

It was originally designed and used by Google as an internal project codenamed Borg, it was later open-sourced and is now maintained by the Cloud Native Computing Foundation.
Kubernetes has established itself as the defacto standard for container orchestration and is the flagship project of the CNCF, backed by key players like Google, AWS, Microsoft, IBM, Intel, Cisco, and Red Hat.


## Why Kubernetes?
Companies that move to microservice and cloud-native architectures that make use of containers are looking for strong, proven platforms. And the number of those organizations is ever-growing in the last years.

Kubernetes allows efficient distributions of applications across a cluster of nodes with the abstraction of resources like CPU and memory. Kubernetes can run anywhere, from bare metal to any cloud provider infrastructure and it focuses on deploying containers inside the infrastructure instead of directly utilizing hosts/nodes.

Some of the platform features which Kubernetes offers are:
* Container grouping using pod
* Self-healing
* Auto-scalability
* DNS management
* Load balancing
* Rolling update or rollback
* Resource monitoring and logging

It's no surprise that the vast majority of microservice projects are run on a Kubernetes cluster with all the benefits Kubernetes offers out of the box.

## Running a Kubernetes cluster
Several cloud service providers offer different Kubernetes implementations. Among the most popular ones, you can find:

* **Minikube:** An open-source tool that implements a local Kubernetes cluster on macOS, Linux, and Windows. Perfect for local testing and development or people who want to easily try out their applications on Kubernetes.
* **Google Kubernetes Engine (GKE):** Google's solution that manages production-ready Kubernetes clusters for you.
* **Amazon Elastic Kubernetes Service (EKS):** Amazon's solution that manages production-ready Kubernetes clusters for you.
* **Azure Kubernetes Service (AKS):** Azure's solution that provides you managed, production-ready Kubernetes clusters.
* **OpenShift Kubernetes:** Red Hat's solution that handles Kubernetes clusters for you.

It is also possible to run a private cluster on your data center and/or infrastructure.


## Helm
[Helm](https://helm.sh/) is a package manager for Kubernetes applications. It is maintained by the CNCF in collaboration with Microsoft, Google Bitnami and the Helm contributor community.

Helm is composed of a client and an in-cluster server component:
* **Tiller Server:** Kubernetes application are managed through a component called Tiller Server installed within a Kubernetes cluster. Tiller interacts with the Kubernetes API server to install, upgrade, query and remove Kubernetes resources.

* **Helm Client:** A command-line interface is needed for users to work with Helm Charts. This client is interacting with the Tiller Server to perform various operations like install, upgrade and rollback charts.


## Wazo Platform C4 Helm chart and templates
We've recently published a [Helm chart](https://github.com/wazo-platform/wazo-c4-helm) that enables our users to deploy our C4 solution in a Kubernetes cloud easily.

This repository ties together all of our C4 components in a Kubernetes environment and its associated ecosystem of tools to address key concerns of a microservice architecture.

## Conclusions
To wrap it up Wazo Platform C4 is now easily deployable on a Kubernetes cluster. It is scalable and cloud-ready. We will work hard in the next months to test and improve our C4 infrastructure and can't wait for our users to deploy our solution in the cloud. The future of telecommunications is here and it's open-source!


## References
* https://www.cncf.io/
* https://kubernetes.io/
* https://helm.sh/
* https://auth0.com/blog/kubernetes-tutorial-step-by-step-introduction-to-basic-concepts/
* https://blog.newrelic.com/engineering/what-is-kubernetes/
