# Generated by Django 2.2.1 on 2020-08-26 22:33

import SETyRS.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SETyRS', '0003_solicitudexamen_hora_exa'),
    ]

    operations = [
        migrations.CreateModel(
            name='reglamento_interior_titulacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CCT', models.CharField(max_length=30)),
                ('RIT', models.FileField(blank=True, null=True, upload_to='SETyRS/archivos/alumnos', validators=[SETyRS.validators.validate_file_extension])),
            ],
        ),
    ]
