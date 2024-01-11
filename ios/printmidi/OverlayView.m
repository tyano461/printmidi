#include "OverlayView.h"

@implementation OverlayView

- (id) init {
    if (self = [super initWithFrame:CGRectZero]) {
        self.backgroundColor = [UIColor blackColor];
        self.alpha = 0.3;
    }
    return self;
}

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    [self.target performSelector:self.action withObject:self afterDelay:0.0f];
}

@end