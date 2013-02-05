if(Ti.App.Properties.hasProperty('when')){
        Ti.App.iOS.cancelAllLocalNotifications();
        var notifications = [];
        notification_params = {
              alertBody: Ti.App.Properties.getString('message'),
              alertAction: 'OK',
              userInfo: {
                alertMessage:'ピンポンパンポン！'
              },
              sound: 'sound.mp3',
              repeat: 'daily',
              date: new Date(Ti.App.Properties.getString('when'))
            };
        notifications.push(Ti.App.iOS.scheduleLocalNotification(notification_params));
}
Ti.App.currentService.stop();