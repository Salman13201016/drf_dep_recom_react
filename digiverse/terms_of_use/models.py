from django.db import models

class TermsOfUse(models.Model):
    title = models.CharField(max_length=1000, default='Terms Of Use')
    content = models.TextField()
    last_updated = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.title
