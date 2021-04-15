provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}
terraform {
  backend "s3" {
    bucket  = "terraform-state-housing-production"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/t-and-l-search-frontend/state"
  }
}
resource "aws_s3_bucket" "frontend-bucket-production" {
  bucket = "lbh-housing-tl-search-frontend-production.hackney.gov.uk"
  acl    = "private"
  versioning {
    enabled = true
  }
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
module "cloudfront-production" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-production.bucket_regional_domain_name
  origin_id = "mtfh-t-and-l-search-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-production.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-production.id
  orginin_access_identity_desc = "T&L search frontend cloudfront identity"
  cname_aliases = []
  environment_name = "production"
  cost_code= "B0811"
  project_name= "MTFH Tenants and Leaseholders"
  use_cloudfront_cert = true
}
