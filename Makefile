IMAGE_NAME=koinx_backend
CONTAINER_NAME=koinx_backend
PORT=3000
DOCKERFILE_PATH=infrastructure/Dockerfile
BUILD_CONTEXT=.
DOCKER_USERNAME=varunpanyam
DOCKER_REPO=koinx_backend

all: build push run

build:
	@echo "Building docker image..."
	docker build -t ${IMAGE_NAME} -f ${DOCKERFILE_PATH} ${BUILD_CONTEXT}

stop:
	@echo "Stopping existing container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

run:
	@echo "Running docker container"
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):3000 \
		$(IMAGE_NAME)

push:
	@echo "Tagging Docker image..."
	docker tag $(IMAGE_NAME) $(DOCKER_USERNAME)/$(DOCKER_REPO):latest
	@echo "Pushing Docker image to Docker Hub..."
	docker push $(DOCKER_USERNAME)/$(DOCKER_REPO):latest

clean: stop
	@echo "Removing Docker image..."
	docker rmi $(IMAGE_NAME) || true

.PHONY: all build stop run push clean