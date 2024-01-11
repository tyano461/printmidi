//
//  OverlayView.h
//  printmidi
//
//  Created by imac2015 on 2024/01/11.
//

#ifndef OverlayView_h
#define OverlayView_h

#import <UIKit/UIKit.h>

@interface OverlayView : UIView
@property(nonatomic, weak) id target;
@property(nonatomic, assign) SEL action;
@end

#endif /* OverlayView_h */
