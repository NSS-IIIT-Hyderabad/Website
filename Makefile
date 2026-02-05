PROJECT = myapp

up:
	docker compose up

down:
	docker compose down

down-v:
	docker compose down -v

build:
	docker compose build

ub:
	docker compose up --build

ps:
	docker compose ps

logs:
	docker compose logs -f

vub:
	docker compose down -v
	docker compose up --build

restart:
	docker compose down
	docker compose up -d

all:
	docker compose down
	docker compose down -v
	docker compose build
	docker compose up

prune:
	docker system prune -af
	docker volume prune -f
	docker network prune -f

images:
	docker images

containers:
	docker ps -a

clean:
	docker compose down -v --rmi all --remove-orphans

shell:
	docker exec -it $$(docker ps -q | head -n1) sh
	docker exec -it $$(docker ps -q | head -n1) bash
# Production targets
prod-up:
	docker compose -f docker-compose.prod.yml up -d

prod-down:
	docker compose -f docker-compose.prod.yml down

prod-build:
	docker compose -f docker-compose.prod.yml build

prod-ub:
	docker compose -f docker-compose.prod.yml up -d --build

prod-logs:
	docker compose -f docker-compose.prod.yml logs -f

prod-ps:
	docker compose -f docker-compose.prod.yml ps

prod-restart:
	docker compose -f docker-compose.prod.yml down
	docker compose -f docker-compose.prod.yml up -d

prod-clean:
	docker compose -f docker-compose.prod.yml down -v --rmi all --remove-orphans