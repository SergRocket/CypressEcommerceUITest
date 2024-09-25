FROM cypress/base:latest
RUN mkdir /e-commerceuitests
WORKDIR /e-commerceuitests
COPY . /e-commerceuitests
RUN npm install
RUN npx cypress install