# Generated by Django 2.2.1 on 2020-05-12 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SETyRS', '0014_auto_20200512_1752'),
    ]

    operations = [
        migrations.AlterField(
            model_name='solicitudexamen',
            name='area_carrera',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]