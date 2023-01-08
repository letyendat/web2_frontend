
FROM node:16.15.1
RUN mkdir -p /present_fe
WORKDIR /present_fe
COPY . /present_fe/
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]