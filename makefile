heartbeat:
	curl http://localhost:3000/
everyone:
	curl http://localhost:3000/user

find-me:
	curl http://localhost:3000/user/1
find-you:
	curl http://localhost:3000/user/2
find-test:
	curl http://localhost:3000/user/3

create-me:
	curl -X PUT http://localhost:3000/user --json '{ "email": "chrisbauer.career@gmail.com" }'
update-me:
	curl -X PUT http://localhost:3000/user --json '{ "id": 1, "email": "chrisbauer.career@gmail.com" }'


create-you:
	curl -X PUT http://localhost:3000/user --json '{ "email": "john@test.com" }'
update-you:
	curl -X PUT http://localhost:3000/user --json '{ "id": 2, "email": "jon@test.com" }'

create-test:
	curl -X PUT http://localhost:3000/user --json '{ "email": "wrongemail@email.com" }'
update-test:
	curl -X PUT http://localhost:3000/user --json '{ "id": 3, "email": "rightemail@email.com" }'