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
RUN echo "password asdfasf3320221234" >> /etc/msmtprc
RUN echo "account default : outlook" >> /etc/msmtprc
ENV TZ=Europe/Helsinki
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY server/package.json /home/node/server/
#COPY client/package.json /home/node/client/
#COPY app/database.json .
WORKDIR /home/node/server/
RUN npm install -g db-migrate
RUN npm install -g db-migrate-pg
RUN npm install
#RUN db-migrate up
#COPY app  /home/node/app/



# ENTRYPOINT npm start
#RUN echo "sendmail_path=msmtp -t" >> /usr/local/etc/php/conf.d/php-sendmail.ini


