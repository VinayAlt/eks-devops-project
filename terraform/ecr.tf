provider "aws" {
  region = "ap-south-1"  # Change as needed
}

resource "aws_ecr_repository" "my_ecr_repo" {
  name                 = "eks-demo"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "eks-demo"
    Environment = "dev"
  }
}