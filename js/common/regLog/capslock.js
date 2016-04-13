define(function (require, exports, module) {

	// capslockTip样式 .capslock-tip {right: 2px; top: -45px; } .tips{position: absolute; background: #fef4e5; border: solid 1px #f6c090; color: #bc5212; display: none; padding: 0 12px; height: 32px; text-align: center; line-height: 32px; border-radius: 3px; z-index: 11; .arrow {width: 0; height: 0; line-height: 0; font-size: 0; border-color: #f6c090 transparent transparent; border-style: solid dashed dashed; border-width: 8px; position: absolute; left: 50%; margin-left: -4px; bottom: -16px; } .arrow-inner {width: 0; height: 0; line-height: 0; font-size: 0; border-color: #fef4e5 transparent transparent; border-style: solid dashed dashed; border-width: 8px; position: absolute; left: 50%; margin-left: -4px; bottom: -15px; } }

	//关闭ie浏览器默认事件
	document.msCapsLockWarningOff = true;
	var isCapitalOn = ''; //空为未确认，on为打开CapsLock ；off为CapsLock关闭
	var capslockTip =
		'<div class="capslock-tip tips">大写已开启<b class="arrow"></b><b class="arrow-inner"></b></div>';
	var pwd = $("input[type='password']");
	var caplocks = {
		init: function () {
			var _this = this;
			_this.append();
			pwd.on('focusin.capslock', function (e) {
				if (isCapitalOn == 'on') {
					_this.show($(this));
					$(this).closest('.form-item').css('z-index',15);
				} else {
					_this.hide($(this));
					$(this).closest('.form-item').css('z-index',12);
				}
			})
			pwd.on('keyup.capslock', function (e) {
				_this.detectCapsLockKeyup($(this), e);
				$(this).closest('.form-item').css('z-index',15);
			})
			pwd.on('keypress.capslock', function (e) {
				_this.detectCapsLock($(this), e);
				$(this).closest('.form-item').css('z-index',15);
			})
			pwd.on('focusout.capslock', function (e) {
				_this.hide($(this));
				$(this).closest('.form-item').css('z-index',12);
			})
		},
		append: function () {
			pwd.each(function () {
				$(this).parent().append(capslockTip);
			})
		},
		show: function (ele) {
			ele.parent().find('.capslock-tip').show();
		},
		hide: function (ele) {
			ele.parent().find('.capslock-tip').hide();
		},
		detectCapsLock: function (ele, event) {
			var keyCode = event.keyCode || event.which;
			var isShift = event.shiftKey || (keyCode == 16) ||
				false;
			var c1 = (keyCode >= 65 && keyCode <= 90) && !
					isShift; // Caps Lock 打开，且没有按住shift键
			var c2 = (keyCode >= 97 && keyCode <= 122) &&
				isShift; // Caps Lock 打开，且按住shift键
			var c3 = (keyCode >= 65 && keyCode <= 90) &&
				isShift; // Caps Lock 关闭，且按住shift键
			var c4 = (keyCode >= 97 && keyCode <= 122) && !
					isShift; // Caps Lock 关闭，且没有按住shift键
			if (c1 || c2) {
				isCapitalOn = 'on';
				this.show(ele);
			}
			if (c3 || c4) {
				isCapitalOn = 'off';
				this.hide(ele);
			}
		},
		//按下CapsLock检测事件
		detectCapsLockKeyup: function (ele, event) {
			var _this = this;
			var e = event || window.event;
			if (e.keyCode == 20 && isCapitalOn != '') {
				if (isCapitalOn == 'on') {
					isCapitalOn = 'off';
					_this.hide(ele);
				} else {
					isCapitalOn = 'on';
					_this.show(ele);
				}
			}
		}
	}
	caplocks.init();
})
