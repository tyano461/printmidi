//
//  swftMidiModule.swift
//  printmidi
//
//  Created by imac2015 on 2024/01/08.
//

import Foundation
import AVFoundation

@objc class Sampler : NSObject {
    let audioEngine = AVAudioEngine()
    let unitSampler = AVAudioUnitSampler()

    @objc
    func initialize() {
        audioEngine.attach(unitSampler)
        audioEngine.connect(unitSampler, to: audioEngine.mainMixerNode, format: nil)
        if let _ = try? audioEngine.start() {
            loadSoundFont()
        }
    }

    func deinitialize() {
        if audioEngine.isRunning {
            audioEngine.stop()
            audioEngine.disconnectNodeOutput(unitSampler)
            audioEngine.detach(unitSampler)
        }
    }

    @objc
    func play() {
        unitSampler.startNote(60, withVelocity: 80, onChannel: 0)
    }

    @objc
    func stop() {
        unitSampler.stopNote(60, onChannel: 0)
    }

    func loadSoundFont() {
        guard let url = Bundle.main.url(forResource: "EmuAPS_8MB",
                                        withExtension: "sf2") else { return }
        try? unitSampler.loadSoundBankInstrument(
            at: url, program: 0,
            bankMSB: UInt8(kAUSampler_DefaultMelodicBankMSB),
            bankLSB: UInt8(kAUSampler_DefaultBankLSB)
        )
    }

    @objc
    func openfile() {
        
    }
}
