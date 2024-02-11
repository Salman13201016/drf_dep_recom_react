from django.db import models

class PrivacyPolicy(models.Model):
    title = models.CharField(max_length=100, default="Privacy Policy")
    content = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

