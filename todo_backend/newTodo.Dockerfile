FROM alpine:3.24.4
RUN apk update && apk add curl
COPY new_todo.sh .
RUN chmod +x new_todo.sh
CMD ["sh", "./new_todo.sh"]