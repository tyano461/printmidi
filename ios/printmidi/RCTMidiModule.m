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
#import "OverlayView.h"

static Boolean _initialized = false;
static Boolean _other_view_shown = false;
static RCTResponseSenderBlock cb;
static UIView *picker = nil;
static UIView *overlayView = nil;

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
      cb(@[@"0", @"{}", @"success"]);
    }
    else {
      NSLog(@"Import failed. %@", err.localizedDescription);
      cb(@[@"-1", @"{}", @"failed"]);
    }
  } else {
    cb(@[@"0", @"{}", @"cloud"]);
  }
}

- (void)documentPickerWasCancelled:(UIDocumentPickerViewController*) controller {
  cb(@[@"-1", @"{}", @"cancelled"]);
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

- (void)openMidi: (RCTResponseSenderBlock)callback {
  if (_other_view_shown) {
    callback(@[@"-1", @""]);
  }
  UIDocumentPickerViewController *picker = [[UIDocumentPickerViewController alloc] initForOpeningContentTypes: @[(UTType*)UTTypeMIDI] asCopy:true];
  UIViewController *rnvc = RCTPresentedViewController();
  
  cb = callback;
  picker.delegate = self;
  
  [rnvc presentViewController:picker animated:true completion:nil];
}

RCT_EXPORT_METHOD(OpenMidi: (RCTResponseSenderBlock)callback) {
  if ([NSThread isMainThread]) {
    [self openMidi: callback];
  } else {
    dispatch_async(
                   dispatch_get_main_queue(),
                   ^{
                     [self openMidi: callback];
                   });
    
  }
}

- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)thePickerView {
  return 1;
}
- (NSInteger)pickerView:(UIPickerView *)thePickerView
numberOfRowsInComponent:(NSInteger)component {
  return  self.drumlist ? [self.drumlist count] : 1;
}
- (NSString *)pickerView:(UIPickerView *)thePickerView
             titleForRow:(NSInteger)row forComponent:(NSInteger)component {
  return self.drumlist ? [self.drumlist objectAtIndex:row] : @"";
}

- (void)pickerView:(UIPickerView *)thePickerView
      didSelectRow:(NSInteger)row
       inComponent:(NSInteger)component {
}

- (void)showDrumSelector: (NSInteger)channel list:(NSArray*)list callback:(RCTResponseSenderBlock)callback {
  UIView *picker;
  UIViewController *rnvc;

  if (!list || ![list count]) {
    callback(@[@"-1", @"list none"]);
    return;
  }

  if (!picker) {
    picker = [self createPicker];
  }
  self.drumlist = list;
  
  rnvc =RCTPresentedViewController();
  [rnvc.view addSubview:picker];
}

RCT_EXPORT_METHOD(ShowDrumSelector: (NSInteger)channel list:(NSArray*)list callback:(RCTResponseSenderBlock)callback) {
  
  if ([NSThread isMainThread]) {
    [self showDrumSelector:channel list:list callback:callback];
  } else {
    dispatch_async(
                   dispatch_get_main_queue(),
                   ^{
                     [self showDrumSelector:channel list:list callback:callback];
                   }
                   );
  }
}
- (void)showAlert:(NSString*) title message:(NSString*)message button:(NSArray*)button style:(NSString*)style  callback:(RCTResponseSenderBlock)callback {
  UIAlertController* alert;
  UIViewController *rnvc;
  UIAlertAction* defaultAction;
  NSMutableAttributedString *atmsg;
  NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
  
  alert = [UIAlertController alertControllerWithTitle:title
                                              message:message
                                       preferredStyle:UIAlertControllerStyleAlert];
  
  if (style != nil && [style isEqualToString:@"left"]) {
    paragraphStyle.alignment = NSTextAlignmentLeft;
    NSDictionary *attr = @{NSParagraphStyleAttributeName: paragraphStyle, NSFontAttributeName: [UIFont systemFontOfSize:12]};
    atmsg = [[NSMutableAttributedString alloc] initWithString:message attributes:attr];
    
    [alert setValue:atmsg forKey:@"attributedMessage"];
  }
  
  defaultAction = [UIAlertAction actionWithTitle:[button objectAtIndex:0]
                                           style:UIAlertActionStyleDefault
                                         handler:^(UIAlertAction * action) {}];
  
  [alert addAction:defaultAction];
  rnvc =RCTPresentedViewController();
  [rnvc presentViewController:alert animated:YES completion:nil];
}

RCT_EXPORT_METHOD(ShowAlert: (NSString*)title message:(NSString*)message button:(NSArray*)button style:(NSString*) style  callback:(RCTResponseSenderBlock)callback ){
  if ([NSThread isMainThread]) {
    [self showAlert:title message:message button:button style:style callback: callback ];
  } else {
    dispatch_async(
                   dispatch_get_main_queue(),
                   ^{
                     [self showAlert:title message:message button:button style:style callback: callback ];
                   }
                   );
    
  }
}

- (UIView*) createPicker {
  UIView *picker;
  UIPickerView *drum;
  UIButton *button;

  if (!overlayView) {
    overlayView = [[OverlayView alloc] init];
  }

  picker = [[UIView alloc]initWithFrame:CGRectMake(0,300, 300, 330)];
  drum = [[UIPickerView alloc] initWithFrame:CGRectMake(0,30,300,300)];
  button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
  button.frame = CGRectMake(0, 0, 300, 30);
  [button setTitle:@"完了" forState:UIControlStateNormal];
  [button addTarget:self action:@selector(decidePicker:) forControlEvents:UIControlEventTouchUpInside];

  drum.delegate = self;
  drum.dataSource = self;

  [picker addSubview:overlayView];
  [picker addSubview:button];
  [picker addSubview:drum];
  return picker;
}

- (void)overlayTouch:(NSSet *)touches withEvent:(UIEvent *)event {
  [self cancelPicker];
}

- (void)decidePicker:(UIButton*)button {
  cb(@[@"0", @"0"]);
}
- (void)cancelPicker {
  cb(@[@"-1", @"1"]);
}
@end