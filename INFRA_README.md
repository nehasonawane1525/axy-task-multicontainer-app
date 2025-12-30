## Overall Architecture & Diagrammatic Workflow
### High-Level Architecture Diagram

                ┌───────────────────────────────┐
                │            Internet            │
                └───────────────┬───────────────┘
                                │
                                │ HTTPS / HTTP
                                ▼
                ┌───────────────────────────────┐
                │   Application Load Balancer    │
                │      (Public Subnets)          │
                └───────────────┬───────────────┘
                                │
               ┌────────────────┴────────────────┐
               │                                 │
               ▼                                 ▼
    ┌──────────────────────┐       ┌──────────────────────┐
    │  Frontend ECS Tasks   │       │  Frontend ECS Tasks   │
    │  (Port 8080)          │       │  (Port 8080)          │
    │  Private Subnet (AZ1) │       │  Private Subnet (AZ2) │
    └─────────────┬────────┘       └─────────────┬────────┘
                  │                               
                  │ Internal Service Calls
                  ▼
    ┌──────────────────────┐       ┌──────────────────────┐
    │  Backend ECS Tasks    │       │  Backend ECS Tasks    │
    │  (Port 3000)          │       │  (Port 3000)          │
    │  Private Subnet (AZ1) │       │  Private Subnet (AZ2) │
    └─────────────┬────────┘       └─────────────┬────────┘
                  │
                  │ PostgreSQL (5432)
                  ▼
       ┌────────────────────────────────────┐
       │      Amazon RDS PostgreSQL           │
       │      Multi-AZ (Private Subnets)      │
       │      Automated Backups Enabled       │
       └────────────────────────────────────┘
---

## Reason to choose specific AWS services 

- **Amazon VPC** – Enables isolated and secure networking with complete control over routing and access.
- **Public and Private Subnets** – Separates internet-facing resources from internal services to enhance security.
- **Internet Gateway** – Provides inbound internet connectivity for public-facing components.
- **NAT Gateway** – Allows private resources to access external services without exposing them publicly.
- **Amazon ECS (Fargate)** – Runs containerized applications without managing servers, simplifying deployment and scaling.
- **Amazon ECR** – Secure and fully managed Docker image registry tightly integrated with ECS.
- **Application Load Balancer (ALB)** – Performs Layer 7 traffic routing and health checks for ECS services.
- **AWS IAM** – Implements least-privilege access control between AWS services.
- **Amazon RDS PostgreSQL** – Managed relational database with automated backups and built-in security.
- **RDS Multi-AZ** – Ensures high availability with automatic failover and no application changes.
- **Security Groups** – Acts as a virtual firewall to strictly control traffic between infrastructure components.
- **AWS CloudFormation** – Enables consistent, repeatable, and version-controlled infrastructure provisioning.

---

## How to Deploy the CloudFormation Stack

> The following steps describe how this CloudFormation template would be deployed using AWS CLI.  

---

### Prerequisites

- AWS CLI installed and configured
- IAM user/role with permissions for:
  - CloudFormation
  - ECS
  - ECR
  - RDS
  - EC2 (VPC, Subnets, ALB)
  - IAM
- Docker images for frontend and backend already pushed to Amazon ECR

---

### Step 1: Configure AWS CLI

```bash
aws configure
```
Provide:

- AWS Access Key ID
- AWS Secret Access Key
- Default region
- Output format (json)

---

### Step 2: Create the CloudFormation Stack

```bash
aws cloudformation create-stack \
  --stack-name ecs-multi-tier-app \
  --template-body file://AWS_INFRA_CFN.yaml \
  --parameters \
    ParameterKey=DBUsername,ParameterValue=<DB_USERNAME> \
    ParameterKey=DBPassword,ParameterValue=<DB_PASSWORD> \
  --capabilities CAPABILITY_NAMED_IAM
```
- Download AWS_INFRA_CFN.yaml file on local and use 
- CAPABILITY_NAMED_IAM is required because IAM roles are created in the template.
- Database credentials are passed securely as parameters

---


### Step 3: Monitor Stack Creation

```bash
aws cloudformation describe-stacks \
  --stack-name ecs-multi-tier-app
```

- Or view progress in the AWS Console:
- CloudFormation → Stacks → Events

### Step 4: Retrieve Application Endpoint

```bash
aws cloudformation describe-stacks \
  --stack-name ecs-multi-tier-app \
  --query "Stacks[0].Outputs"
```

- Copy the Application Load Balancer DNS name
- Open it in a browser to access the frontend application

----

## Security considerations implemented

- **Isolated VPC with public and private subnets** – Separates internet-facing resources from internal services.
- **Application Load Balancer as the only public entry** – All external traffic flows through ALB, keeping services protected.
- **Backend and database in private subnets** – Prevents direct internet access to sensitive components.
- **Security groups with restricted rules** – Allow traffic only between required services.
- **Database access limited to backend** – RDS accepts connections only from backend ECS tasks.
- **Least-privilege IAM roles for ECS tasks** – ECS tasks receive only the permissions needed to run.
- **Database credentials via CloudFormation parameter**s – Sensitive values are not hardcoded.


---
