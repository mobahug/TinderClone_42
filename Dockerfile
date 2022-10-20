FROM node:18-bullseye
RUN apt-get update && apt-get install -q -y msmtp mailutils sudo
RUN echo "defaults" >> /etc/msmtprc
RUN echo "port 587"  >> /etc/msmtprc
RUN echo "tls on" >> /etc/msmtprc
RUN echo "tls_trust_file /etc/ssl/certs/ca-certificates.crt" >> /etc/msmtprc
RUN echo "account outlook" >> /etc/msmtprc
RUN echo "host smtp.office365.com" >> /etc/msmtprc
RUN echo "from freecss2022@outlook.com" >> /etc/msmtprc
RUN echo "auth on" >> /etc/msmtprc
RUN echo "user freecss2022@outlook.com" >> /etc/msmtprc
RUN echo "password ILJJLijALSDI" >> /etc/msmtprc
RUN echo "account default : outlook" >> /etc/msmtprc
ENV TZ=Europe/Helsinki
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY server/package.json /home/node/server/
WORKDIR /home/node/server/
RUN npm install -g db-migrate
RUN npm install -g db-migrate-pg
RUN npm install