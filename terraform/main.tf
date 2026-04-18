provider "aws" {
  region = "ap-south-1"
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "demo-eks"
  cluster_version = "1.29"

  vpc_id     = data.aws_vpc.default.id
  subnet_ids = data.aws_subnets.default.ids

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  enable_cluster_creator_admin_permissions = true 

  eks_managed_node_groups = {
    default = {
      desired_size = 2
      max_size     = 2
      min_size     = 1

      instance_types = ["t3.medium"]
      ami_type = "AL2_x86_64"
    }
  }
}