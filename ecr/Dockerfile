FROM public.ecr.aws/lambda/python:3.10

# Set working directory inside the Lambda image
WORKDIR ${LAMBDA_TASK_ROOT}

# Copy requirements.txt first (for caching)
COPY requirements.txt .

# Install build tools for compiling pydantic-core
RUN yum install -y gcc python3-devel && \
    pip3 install --upgrade pip && \
    pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}" --no-cache-dir && \
    yum clean all

# Copy your app source code
COPY ./app ${LAMBDA_TASK_ROOT}

# Set the Lambda function handler
CMD [ "app.handler" ]
