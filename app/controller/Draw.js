Ext.define('SenchaDraw.controller.Draw',{
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'mainview',
			drawButton: 'mainview > container > container > button[text="Draw"]',
			editor: 'editor',
			friendList: 'friendlist',
			viewPanel: 'viewpanel',
			viewingCanvas: 'viewpanel > canvas',
			drawingCanvas: 'editor > canvas'
		},
		control: {
			friendList: {
				viewDrawCommand: 'onViewDraw'
			},
			drawingCanvas: {
				touchstart: 'onTouchStart',
				touchend: 'onTouchEnd',
				touchmove: 'onTouchMove'
			},
			mainView: {
				push: 'onPush',
				pop: 'onPop'
			},
			drawButton: {
				tap: 'onDraw'
			},
			editor: {
				cancelDrawCommand: 'onCancelDraw',
				finishDrawCommand: 'onFinishDraw'
			}
		},
		canvasObject: null,
		drawEchoes: [],
		isDrawingStarted: false,
		drawToUser: 0
	},

	onViewDraw: function(record) {
		if (!this.viewPanel)
			viewPanel = Ext.widget('viewpanel');
		this.getMainView().push(this.getViewPanel());

		this.setDrawToUser(record.data.id);

		var self = this,
			canvas = this.getCanvasObject(),
			echoes = this.getDrawEchoes();

		this.setCanvasObject(this.getViewingCanvas().element.dom.childNodes[0]);
		canvas = this.getViewingCanvas().element.dom.childNodes[0];

		canvas.width = viewPanel.element.getWidth();
		canvas.height = viewPanel.element.getHeight();

		echoes.length = 0;

		Ext.Ajax.request({
			url: 'http://192.168.168.11:8888/SenchaDraw/Get.php',
			params: {
				to: this.getDrawToUser()
			},
			method: 'POST',
			success: function(response, opts) {			
				var obj = Ext.decode(response.responseText);
				
				if (obj.success) {
					echoes = Ext.JSON.decode(obj.echoes);
					self.viewRepeat(echoes);
				}
				else
					Ext.Msg.alert('Error', 'Oops!')
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Error', 'Oops!')
			}
		});
	},

	viewRepeat: function(jsonEchoes) {
		var canvas = this.getCanvasObject(),
			isDrawing = this.getIsDrawingStarted(),
			context = null;
		
		//get canvas HTML element
		this.setCanvasObject(this.getViewingCanvas().element.dom.childNodes[0]);
		canvas = this.getViewingCanvas().element.dom.childNodes[0];
		context = canvas.getContext('2d');

		var totalEchoes = jsonEchoes.length;
		var echoStep = 0;

		var echoInterval = setInterval(function() {
			if (echoStep >= totalEchoes) {
				clearInterval(echoInterval);
				return;
			};
			if (jsonEchoes[echoStep].move)
				context.moveTo(jsonEchoes[echoStep].x,jsonEchoes[echoStep].y);
			else {
				context.lineTo(jsonEchoes[echoStep].x,jsonEchoes[echoStep].y);
	  			context.stroke();
			}
			echoStep++;
		}, 30);
	},

	onTouchStart: function(self, e) {
		var canvas = this.getCanvasObject(),
			context = null,
			echoes = this.getDrawEchoes();

		//get canvas HTML element
		this.setCanvasObject(self.canvas.dom);
		canvas = self.canvas.dom;
		context = canvas.getContext('2d');

		context.moveTo(e.event.layerX,e.event.layerY);
		echoes.push({x:e.event.layerX,y:e.event.layerY,move:true});

		this.setIsDrawingStarted(true);
	},

	onTouchMove: function(self, e) {
		var canvas = this.getCanvasObject(),
			isDrawing = this.getIsDrawingStarted(),
			context = null,
			echoes = this.getDrawEchoes();
		
		//get canvas HTML element
		this.setCanvasObject(self.canvas.dom);
		canvas = self.canvas.dom;
		context = canvas.getContext('2d');

		if (isDrawing) {
			//e.event.offsetX is not working in iOS
			context.lineTo(e.event.layerX,e.event.layerY);
      		context.stroke();
      		echoes.push({x:e.event.layerX,y:e.event.layerY,move:false});
      		this.setDrawEchoes(echoes);
		}
	},

	onTouchEnd: function(self, e) {
		this.setIsDrawingStarted(false);
	},

	onPush: function(view, item) {
		if (item.xtype == 'viewpanel')
			this.getDrawButton().show();
		else
			this.getDrawButton().hide();
	},

	onPop: function(view, item) {
		this.getDrawButton().hide();
	},

	onDraw: function() {
		if (!this.editor)
			this.editor = Ext.widget('editor');

		Ext.Viewport.setActiveItem(this.getEditor());

		var canvas = this.getCanvasObject(),
			echoes = this.getDrawEchoes();

		//get canvas HTML element
		this.setCanvasObject(this.getDrawingCanvas().element.dom.childNodes[0]);
		canvas = this.getDrawingCanvas().element.dom.childNodes[0];

		//set the canvas to fill the area
		canvas.width = this.editor.element.getWidth();
		canvas.height = this.editor.element.getHeight();

		echoes.length = 0;

		this.setDrawEchoes(echoes);
	},

	onFinishDraw: function() {
		var self = this,
			editor = this.getEditor(),
			drawButton = this.getDrawButton();

		editor.setMasked({ xtype: 'loadmask', message: 'Sending...' });
		drawButton.hide();

		Ext.Ajax.request({
			url: 'http://192.168.168.11:8888/SenchaDraw/Draw.php',
			params: {
				echoes: Ext.JSON.encode(this.getDrawEchoes()),
				to: this.getDrawToUser()
			},
			method: 'POST',
			success: function(response, opts) {
				editor.unmask();
				drawButton.show();
				
				var obj = Ext.decode(response.responseText);
				
				if (obj.success)
					Ext.Viewport.setActiveItem(self.getMainView());
				else
					Ext.Msg.alert('Error', 'Oops!')
			},
			failure: function(response, opts) {
				editor.unmask();
				drawButton.show();
				Ext.Msg.alert('Error', 'Oops!')
			}
		});
	},

	onCancelDraw: function() {
		Ext.Ajax.abortAll();

		Ext.Viewport.setActiveItem(this.getMainView());
	}
})