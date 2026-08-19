terraform {
  required_providers {
    local = {
      source = "hashicorp/local"
      version = "~> 2.1"
    }
  }
}

provider "local" {}

resource "local_file" "output_file" {
  filename = "${path.module}/output.txt"
  content  = "Hello World from Terraform Infrastructure as Code!"
}
