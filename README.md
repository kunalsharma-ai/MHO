# My Health Opinions
My Health Opinions (MHO) is a platform dedicated to recruiting patients, caregivers, and healthcare professionals to participate in health-related surveys and studies. Our mission is to gather valuable insights that can help improve healthcare services and patient outcomes. 
## Solution Architecture
This solution is a microservices-based architecture deployed on using docker compose. The main components of the architecture include:
- **Frontend Service**: A React-based web application that provides an interface for users to sign up, log in, and participate in surveys.
- **API Gateway**: A Node.js-based service that handles incoming requests from the frontend and routes them to the appropriate backend services.
- **Authentication Service**: A service responsible for user authentication and authorization, including handling sign-ups, logins, and password management.
- **Survey Service**: A service that manages survey creation, distribution, and response collection.
- **Database**: A MongoDB database that stores user information, survey data, and responses.
- **Email Service**: A service that handles sending emails to users for notifications, survey invitations, and other communications.
- **Logging and Monitoring**: A centralized logging service using ELK Stack (Elasticsearch, Logstash, Kibana) to monitor application performance and log errors.
- **Payment Service**: A service that manages payment processing for premium features or services offered on the platform.
- **Message Broker**: A RabbitMQ instance that facilitates communication between services, especially for handling asynchronous tasks like sending emails.
