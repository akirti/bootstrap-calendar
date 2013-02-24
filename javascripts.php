<?php if (!$accessible && isset($loadmaps)){?>
	<script src="http://maps.google.com/maps/api/js?sensor=<?php echo ($device->is_smartdevice)?'true':'false'?>"
			type="text/javascript"></script>
<?php } ?>
<?php if ($accessible){ ?>
	<script type="text/javascript" src="/js/simples.js"></script>
	<script type="text/javascript"  src="/js/utils.min.js"></script>
<?php } else { ?>
	<script src="/js/jquery.cookie.min.js"></script>
	<script src="/js/jquery.dotdotdot-1.5.2.min.js"></script>
	<script src="/js/modernizr.2.6.1.js"></script>
	<script src="/js/google.fastbutton.js"></script>
	<script src="/js/jquery.google.fastbutton.js"></script>
	<script src="/js/bootstrap.min.js"></script>
	<script src="/js/bootstrap.datepicker.min.js"></script>
	<script src="/js/oad/oad-utils.js"></script>
	<script src="/js/utils.min.js"></script>
	<script src="/js/oad/oad-ui.js"></script>
	<script src="/js/oad/oad-lib.js"></script>
	<script src="/js/oad/oad-widget-dialog.js"></script>
	<script src="/js/oad/oad-widget-messagebar.js"></script>
	<script src="/js/oad/oad-widget-cookiecontrol.js"></script>
	<script src="/js/oad/oad-widget-mobilemenu.js"></script>
	<script src="/js/oad/oad-widget-geomap.js"></script>
	<script src="/js/oad/oad-widget-collapseblock.js"></script>
	<script src="/js/oad/oad-widget-youtubevideo.js"></script>
	<script src="/js/appmain.js"></script>
<?php } ?>