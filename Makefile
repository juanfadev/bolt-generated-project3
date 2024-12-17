.PHONY: help build deploy-local deploy-vercel

    help: ## Show this help message
    	@echo "Available commands:"
    	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

    build: ## Build the application for production
    	npm run build

    deploy-local: build ## Deploy the application locally
    	npm start

    deploy-vercel: build ## Deploy the application to Vercel (read-only database)
    	vercel --prod

    # Add other deployment targets as needed (e.g., deploy-aws, deploy-heroku)
