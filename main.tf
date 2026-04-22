terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = "portfolio-250803"
  region  = "us-central1"
}

# ---------------------------
# 1. ARTIFACT REGISTRY
# ---------------------------
resource "google_artifact_registry_repository" "repo" {
  location      =  "us-central1"
  repository_id = "portfolio-repo"
  description   = "Docker images for portfolio app"
  format        = "DOCKER"
}

# ---------------------------
# 2. CLOUD RUN SERVICE
# ---------------------------
resource "google_cloud_run_v2_service" "site" {
  name     = "portfolio-site"
  location =  "us-central1"

  template {
      containers {
        # placeholder image for now
        # you will replace this later from GitHub Actions
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
  }

}

# ---------------------------
# 3. ALLOW PUBLIC ACCESS (simple for portfolio)
# ---------------------------
resource "google_cloud_run_v2_service_iam_member" "public" {
  location = google_cloud_run_v2_service.site.location
  name  = google_cloud_run_v2_service.site.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
