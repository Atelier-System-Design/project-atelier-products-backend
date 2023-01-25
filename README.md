# Atelier Product Service

The Atelier Product Service supports the Overview and Related Items section of the [Atelier product page](https://github.com/TeamJBox/rfp2210-fec).

## Description

Built and optimized a back-end API for an e-commerce application capable of handling 5000 requests per second with a < 1% error rate.

## Tech Stack
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Project Overview

### Data Transfer

25 million records were transferred from CSV files into a PostgreSQL database using a custom loader function.

### Local Stress Testing

Initial stress testing on randomized local data using K6 showed an average response time of 7.8s at 1000 RPS.

![k6 1000 rps](https://user-images.githubusercontent.com/93167286/214456943-3c76f861-3efb-45c1-9ac1-0ef13fe18861.png)

After optimizations to database indexing, queries, and pagination method response time improved to an average of 47.15ms at 1000 RPS. 

![products route 1000 rps stress test](https://user-images.githubusercontent.com/93167286/214457218-3f97a387-0e89-4588-b272-1106ec11aa83.png)


### Deployment

After deploying both the server and database to AWS EC2 instances stress testing with loader.io demonstrated that the service was capable of handling 1000 RPS with a 92 ms response time and 0% error rate.

![1000 rps](https://user-images.githubusercontent.com/93167286/214458788-84ad2491-79dd-409a-b896-95e7e0ea5df8.png)

However, the service began to slow down significantly at a 2000 RPS load with an average response time of 3851 ms and > 1% error rate.

![2000 rps](https://user-images.githubusercontent.com/93167286/214459142-cb9a0182-0360-4b75-9e3c-c822c3fd0455.png)

### Load Balancing and Caching

In pursuit of the 5000 RPS goal an additional EC2 instance was deployed utilizing an NGINX load balancer along with caching. With these additions the service was able to handle a 2000 RPS load with an average response time of 67 ms and < 0.1% error rate.

![2000 rps w: cache](https://user-images.githubusercontent.com/93167286/214459782-a6a93ab6-f5a4-493e-a53c-f5fa9b4b1281.png)

Finally, two more EC2 instances were added and the service was able to reach the 5000 RPS goal with an average response time of 64 ms and < 1% error rate.

![5000 rps](https://user-images.githubusercontent.com/93167286/214460127-6b721813-d5e5-48fe-a3bd-1c7390ecc545.png)

### Further Optimizations

To increase performance of the service in the future I would consider vertically scaling to a more powerful AWS instance as well as further optimizing the database queries. 

