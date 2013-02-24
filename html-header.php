<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
	<title><?php echo $meta['title'];?></title>
	<meta charset="utf-8">
	<meta name="ROBOTS" content="ALL" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<base href="<?php echo $settings->get('SITE_URL');?>" />
	<meta name="keywords" content="<?php echo $meta['keywords'];?>" />
	<meta name="description" content="<?php echo $meta['description'];?>" />
	<meta name="author" content="On All Devices Ltd (hello@onalldevices.com)">

	<!-- Open graph -->
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="<?php echo $settings->get('SITE_URL');?>" />
	<meta property="og:title" content="<?php echo $meta['title'];?>" />
	<meta property="og:url" content="<?php echo $settings->get('SITE_URL').$cleanpath;?>" />
	<meta property="og:description" content="<?php echo $meta['description'];?>" />

	<!-- Stylesheets -->
	<link href="<?php echo $settings->get('SITE_URL'); ?>/css/bootstrap-<?php echo $settings->get('SITE_THEME');?>.min.css" media="all" rel="stylesheet"/>
	<link href="<?php echo $settings->get('SITE_URL'); ?>/css/bootstrap-responsive.min.css" media="all" rel="stylesheet"/>
	<link href="<?php echo $settings->get('SITE_URL'); ?>/css/oadlite.css" media="all" rel="stylesheet"/>
	<link href="<?php echo $settings->get('SITE_URL'); ?>/css/oad-site.css" media="all" rel="stylesheet"/>
	<!--[if gte IE 9]>
	<style type="text/css">
		.gradient {
			filter: none;
		}
	</style>
	<![endif]-->

	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<!-- Icons -->
	<link rel="shortcut icon" href="favicon.ico">
	<link rel="apple-touch-icon" sizes="144x144" href="<?php echo $settings->get('SITE_URL'); ?>/img/ico/apple-touch-icon-144.png">
	<link rel="apple-touch-icon" sizes="114x114" href="<?php echo $settings->get('SITE_URL'); ?>/img/ico/apple-touch-icon-114.png">
	<link rel="apple-touch-icon" sizes="72x72" href="<?php echo $settings->get('SITE_URL'); ?>/img/ico/apple-touch-icon-72.png">
	<link rel="apple-touch-icon" href="<?php echo $settings->get('SITE_URL'); ?>/img/ico/apple-touch-icon-57.png">

	<!-- Settings -->
	<script src="<?php echo $settings->get('SITE_URL'); ?>/js/settingsjs"></script>

	<!-- jQuery Lib -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script>
		if (typeof jQuery == 'undefined') {
			document.write(decodeURI("%3Cscript src='js/jquery-1.7.2.min.js'%3E%3C/script%3E"));
		}
	</script>

	<!-- Analytics -->
	<?php
		if ($device->is_featurephone){
			echo $utils->analytics_get_mobile_beacon();
		} else {
			echo $utils->analytics_get_trackscript();
		}
	?>

	<!-- Include google authorship tag if is a blog page -->
	<?php if ($is_blog && strlen($settings->get('GOOGLE_PLUS_ID') > 0)){?>
		<a rel="author" href="https://profiles.google.com/<?php echo $settings->get('GOOGLE_PLUS_ID');?>/about">
			<?php echo $settings->get('SITE_NAME');?>
		</a>
	<?php } ?>
	<link rel="alternate" href="/blog/feed/" title="Front Page Advantage Blog Feed" type="application/rss+xml" />

</head>
<body>
	<?php if (DEV_DEBUG){?>
		<div id="oad-responsive-size"></div>
	<?php } ?>