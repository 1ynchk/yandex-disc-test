# yandex-disc-test

GETTING STARTED: 

# docker-compose.yml

Change environment variables:

```
services:

    backend-server: 
        ...
        environment:
            # Data Base (PostgreSQL required)
            - DB_NAME=YOUR_NAME
            - DB_PASSWORD=YOUR_PASSWORD
            - DB_HOST=YOUR_HOST
            - DB_PORT=YOUR_PORT
            - DB_USER=YOUR_USER

            # web-server origin
            - DOMEN_NAME=http://127.0.0.1 
        ...

    web-server:
        build:  
            ...
            args: 
                # API server origin
                REACT_APP_API_URL: http://127.0.0.1:8000 
        ...
        environment:
        # API server origin
            - REACT_APP_API_URL=http://127.0.0.1:8000
```

