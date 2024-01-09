//
//  RCTMidiModule.m
//  printmidi
//
//  Created by imac2015 on 2024/01/06.
//

#import <Foundation/Foundation.h>
#import <UniformTypeIdentifiers/UniformTypeIdentifiers.h>
#import <React/RCTUtils.h>
#import "RCTMidiModule.h"

static Boolean _initialized = false;
static RCTResponseSenderBlock cb;
static RCTResponseSenderBlock opencb;

extern void miditest(void(* cb)(void));



void cb2(void) {
  NSString *msg = @"initialized";
  cb(@[msg]);
}

@implementation RCTMidiModule

- (void) initialize:(RCTResponseSenderBlock)callback {
  cb = callback;
  miditest(cb2);
  
  self.sampler = [[Sampler alloc]init];
  [self.sampler initialize];
  
  _initialized = true;
}

- (void)documentPicker:(UIDocumentPickerViewController *)controller didPickDocumentAtURL:(NSURL *)url {
  if (controller.documentPickerMode == UIDocumentPickerModeImport) {
    // ファイルコピー
    NSString *filename = url.lastPathComponent;
    NSString *filePath = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents"] stringByAppendingPathComponent:filename];
    NSError *err = [[NSError alloc] init];
    BOOL result = [[NSFileManager defaultManager] copyItemAtPath:url.path toPath:filePath error:&err];
    
    if (result) {
      NSLog(@"Imported");
      opencb(@[@"0", @"{}", @"success"]);
    }
    else {
      NSLog(@"Import failed. %@", err.localizedDescription);
      opencb(@[@"-1", @"{}", @"failed"]);
    }
  } else {
      opencb(@[@"0", @"{}", @"cloud"]);
  }
}

- (void)documentPickerWasCancelled:(UIDocumentPickerViewController*) controller {
  opencb(@[@"-1", @"{}", @"cancelled"]);
}

RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(playNote:(NSInteger )tonei note:(NSInteger)note callback:(RCTResponseSenderBlock)callback) {
  if (!_initialized) {
    [self initialize:callback];
  }
  [self.sampler play];
}

RCT_EXPORT_METHOD(stopNote:(NSInteger )tonei note:(NSInteger)note callback:(RCTResponseSenderBlock)callback) {
  if (!_initialized) {
    callback(@[@"not play"]);
    return;
  }
  
  [self.sampler stop];
}

RCT_EXPORT_METHOD(moduleinit:(RCTResponseSenderBlock)callback) {
  if (!_initialized) {
    [self initialize:callback];
  }
}

RCT_EXPORT_METHOD(OpenMidi: (RCTResponseSenderBlock)callback) {
  UIDocumentPickerViewController *picker = [[UIDocumentPickerViewController alloc] initForOpeningContentTypes: @[(NSString*)UTTypeMIDI] asCopy:true];
  UIViewController *rnvc = RCTPresentedViewController();

  opencb = callback;
  picker.delegate = self;

  [rnvc presentViewController:picker animated:true completion:nil];
  
  callback(@[@"0", @"{}", @"called"]);
}
@end
