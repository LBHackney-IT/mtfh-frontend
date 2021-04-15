provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}
terraform {
  backend "s3" {
    bucket  = "terraform-state-housing-development"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/t-and-l-search-frontend/state"
  }
}
resource "aws_s3_bucket" "frontend-bucket-development" {
  bucket = "lbh-housing-tl-search-frontend-development.hackney.gov.uk"
  acl    = "private"
  versioning {
    enabled = true
  }
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
module "cloudfront-development" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-development.bucket_regional_domain_name
  origin_id = "mtfh-t-and-l-search-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-development.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-development.id
  orginin_access_identity_desc = "T&L search frontend cloudfront identity"
  cname_aliases = []
  environment_name = "development"
  cost_code= "B0811"
  project_name= "MTFH Tenants and Leaseholders"
  use_cloudfront_cert = true
}
