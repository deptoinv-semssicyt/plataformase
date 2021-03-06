<?php
/**
 * Customizer controls for Custom CSS Section
 */

$wp_customize->add_section(
	'logincust_code_section',
	array(
		'priority' => 40,
		'title' => __( 'Custom CSS & JavaScript', 'login-customizer' ),
		'panel'  => 'logincust_panel',
	)
);

$wp_customize->add_setting(
	'login_customizer_options[logincust_other_css]',
	array(
		'type' => 'option',
		'capability' => 'edit_theme_options',
	)
);

$wp_customize->add_control(
	new WP_Customize_Code_Editor_Control(
		$wp_customize,
		'login_customizer_options[logincust_other_css]',
		array(
			'label' => __( 'Custom CSS', 'login-customizer' ),
			'code_type' => 'text/css',
			'section' => 'logincust_code_section',
			'priority' => 5,
			'settings' => 'login_customizer_options[logincust_other_css]',
		)
	)
);

$wp_customize->add_setting(
	'login_customizer_options[logincust_other_js]',
	array(
		'type' => 'option',
		'capability' => 'edit_theme_options',
	)
);

$wp_customize->add_control(
	new WP_Customize_Code_Editor_Control(
		$wp_customize,
		'login_customizer_options[logincust_other_js]',
		array(
			'label' => __( 'Custom JavaScript', 'login-customizer' ),
			'code_type' => 'text/javascript',
			'section' => 'logincust_code_section',
			'priority' => 10,
			'settings' => 'login_customizer_options[logincust_other_js]',
		)
	)
);
