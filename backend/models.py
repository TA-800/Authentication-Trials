from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

class Course(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course_name = models.CharField(max_length=100, blank=True, default="")
    course_code = models.CharField(max_length=100)
    course_resources = models.TextField()

    def __str__(self):
        return f"{self.course_code}: {self.course_name}"