from django.db import models

# Create your models here.
class Cert(models.Model):
	title = models.CharField(max_length=120)
	description = models.TextField()
	completed = models.BooleanField(default=False)

	def _str_(self):
		return self.title

'''
class Cert(models.Model):
	nombre = models.TextField(max_length=120)
	descripcion = models.TextField()
	fecha = models.DateField()
	json = JSONField()

	def _str_(self):
		return self.nombre
'''