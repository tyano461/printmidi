//
//  RCTMidiModule.h
//  printmidi
//
//  Created by imac2015 on 2024/01/06.
//

#ifndef RCTMidiModule_h
#define RCTMidiModule_h

#import <AVFoundation/AVFoundation.h>
#import <React/RCTBridgeModule.h>
#import "printmidi-Swift.h"

@interface RCTMidiModule : NSObject<RCTBridgeModule, UIDocumentPickerDelegate, UIPickerViewDelegate, UIPickerViewDataSource>
@property AVMIDIPlayer *player;
@property AVAudioEngine *engine;
//@property AVAudioUnitSampler *sampler;
@property Sampler *sampler;
@property NSArray *drumlist;

-(void)initialize:(RCTResponseSenderBlock)callback;
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)thePickerView;
- (NSInteger)pickerView:(UIPickerView *)thePickerView 
              numberOfRowsInComponent:(NSInteger)component; 
- (NSString *)pickerView:(UIPickerView *)thePickerView 
             titleForRow:(NSInteger)row forComponent:(NSInteger)component;

- (void)pickerView:(UIPickerView *)thePickerView 
      didSelectRow:(NSInteger)row 
       inComponent:(NSInteger)component;
- (void)showAlert:(NSString*) title message:(NSString*)message button:(NSArray*)button style:(NSString*)style callback:(RCTResponseSenderBlock)callback ;
- (void)openMidi: (RCTResponseSenderBlock)callback;
- (void)showDrumSelector: (NSInteger)channel list:(NSArray*)list callback:(RCTResponseSenderBlock)callback;
- (UIView*) createPicker;
- (void)overlayTouch:(NSSet *)touches withEvent:(UIEvent *)event;
- (void)decidePicker:(UIButton*)button;
- (void)cancelPicker;
@end

#endif /* RCTMidiModule_h */

