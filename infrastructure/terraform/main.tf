provider "aws" {
  region = "ap-south-1"
}

resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_security_group" "koinx_app_sg" {
  name        = "koinx_app_sg"
  description = "Security group for Koinx"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "koinx_app_sg" {
  ami           = "ami-0d473344347276854"
  instance_type = "t2.micro"

  key_name      = aws_key_pair.deployer.key_name

  security_groups = [aws_security_group.koinx_app_sg.name]

  tags = {
    Name = "Koinx App Server"
  }

  provisioner "remote-exec" {
   inline = [
    "sudo yum update -y",
    "sudo amazon-linux-extras install docker -y",
    "sudo systemctl start docker",
    "sudo systemctl enable docker",
    "sudo groupadd docker || true",
    "sudo usermod -aG docker ec2-user",
    "sudo systemctl restart docker",
    "sudo docker login -u ${var.docker_username} -p ${var.docker_password}",
    "sudo docker --version",
    "sudo docker pull ${var.docker_username}/koinx_backend:latest",
    "sudo docker run -d -p 80:3000 ${var.docker_username}/koinx_backend:latest"
  ]

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("~/.ssh/id_rsa")
      host        = self.public_ip
    }
  }
}

output "instance_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.koinx_app_sg.public_ip
}