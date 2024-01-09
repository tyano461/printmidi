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

@interface RCTMidiModule : NSObject<RCTBridgeModule, UIDocumentPickerDelegate>
@property AVMIDIPlayer *player;
@property AVAudioEngine *engine;
//@property AVAudioUnitSampler *sampler;
@property Sampler *sampler;

-(void)initialize:(RCTResponseSenderBlock)callback;


@end


#endif /* RCTMidiModule_h */

