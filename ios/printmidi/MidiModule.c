//
//  MidiModule.c
//  printmidi
//
//  Created by imac2015 on 2024/01/07.
//

#include "MidiModule.h"

void miditest(void (*cb)(void)){ 
    // MIDIClientRef clientRef;
    // id myManager;
    // MIDIEndpointRef endPointRef;

    // MIDIClientCreate(CFSTR("MyMidiClient"), NULL, (__bridge void *)myManager, &clientRef);
    // MIDIDestinationCreate(clientRef, CFSTR("MyVirtualInPort"), (MIDIReadProc)MidiInputCallback, (__bridge void *)myManager, &endPointRef);
    cb();
}