# Generated by Django 2.2.1 on 2020-06-09 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SigApp', '0038_datostemporalestadistica'),
    ]

    operations = [
        migrations.RenameField(
            model_name='datostemporalestadistica',
            old_name='NombreCarreraA_temp',
            new_name='NombreCarrera_temp',
        ),
        migrations.RemoveField(
            model_name='datostemporalestadistica',
            name='TotalAlumnos_temp',
        ),
        migrations.AddField(
            model_name='datostemporalestadistica',
            name='usuario_mod',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]