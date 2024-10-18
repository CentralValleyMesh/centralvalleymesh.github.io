---
title: Getting Started
description: Getting Started Guide for Meshtastic
date: 2024-06-06
---

## Overview

Just getting started? You've found the right place! 🌟

So, you just picked up your first Meshtastic device, got it booted up, and... crickets 🦗🦗🦗. Did you misconfigure something? Is no one out there? Did you actually install the right thing(s)? What in the world is going on? This guide aims to get you up and running to make your first contact as soon as possible.

<!-- more -->

No Meshtastic device yet? Check out [the list of supported hardware on the official Meshtastic docs](https://meshtastic.org/docs/hardware/devices/).

## Flashing Your Device

Before flashing, make sure your device is recognized within device manager on windows or lsusb on linux. If it shows up as "unrecognized" or as "other device", you probably need to install drivers for it. Check the [meshtastic serial drivers page](https://meshtastic.org/docs/getting-started/serial-drivers/) for details on installing the drivers. If the driver is installed correctly, your device will show up under the "ports" tab in device manager.

With the device drivers installed, make sure you've flashed the current version of Meshtastic using the web flasher at [flasher.meshtastic.org](https://flasher.meshtastic.org/). For more detailed instructions, take a look at [the Meshtastic docs on flashing firmware](https://meshtastic.org/docs/getting-started/flashing-firmware/). If you've changed a bunch of settings or are upgrading from a much older version, it's recommended to select "Full Erase and Install" to ensure no settings are left on the device that may cause issues.

## Connecting to Your Device

Although you've likely already connected to your device, it's worth a review. There are several methods to connect to your device:
- [Android app](https://meshtastic.org/docs/category/android-app/)
- [Mac/iOS app](https://meshtastic.org/docs/category/apple-apps/)
- [Web client](https://meshtastic.org/docs/software/web-client/) (via TCP/IP or serial)
- [Python CLI](https://meshtastic.org/docs/software/python/cli/)

## Setup and Configuration

<future screenshots are still pending here>

1. **Set Your Region**: Mostly likely "US" if you're reading this guide.
2. **Configure Your Channel**:
   - Ensure only one channel if starting from scratch.
   - Set the channel name to blank.
   - Set the key to "Default" (`AQ==`).
   - Set the channel role to "Primary".
   - Recommended: Turn off location/position for this channel until you're ready to turn it back on. By default, precise location is turned on and will beacon out your exact position.

## Next Steps

Hopefully, by this time, you'll be able to get a message out that is acknowledged by another node. Try sending a message on your Primary Channel and see if another node acknowledges (acks) it. If not, here are some next steps:

1. **Antenna Upgrade**:
   - If you're still using the stock antenna, get a new one ASAP. Check out [antenna tests on the Meshtastic docs](https://meshtastic.org/docs/hardware/antennas/) for recommendations.
   - Recommended antennas:
     - [Giznot 17 cm whip](https://www.etsy.com/listing/1689350989/whip-antenna-17cm-for-lora-and)
     - [Smiley 906mhz antennas](https://www.smileyantenna.com/category-s/1835.htm)
     - [Rokland antennas](https://store.rokland.com/collections/802-11ah-wi-fi-halow) (quality control varies as do the specific antennas; check [antenna reports](https://meshtastic.org/docs/hardware/antennas/) and / or verify with [a NanoVNA](https://nanovna.com/))

2. **Antenna Connection**:
   - Use the least amount of cable to connect the antenna since any loss is greatly amplified in Meshtastic usage due to the low power of the device's transmitter.

3. **Height**:
   - Height is key. LoRa is very much line-of-sight, so the higher, the better.
   - Note that the device's RX/TX is asymmetrical, meaning it's much easier to receive a packet than to transmit and have another node receive it.
   - Unlicensed LoRa transmission in the United States under Part 15 is limited to +30 dBm ERP. More info about the bands is available on [the Meshtastic docs](https://meshtastic.org/docs/overview/radio-settings/#north-america-frequency-bands).

## Some Other Notes

- Changing the primary channel's name from the default (blank, appearing as "Primary Channel") will change the LoRa frequency slot. You won't be able to communicate on the mesh defaults. Check out [Creating a Private Primary with Default Secondary](https://meshtastic.org/docs/configuration/tips/#creating-a-private-primary-with-default-secondary) and the note on [this documentation page](https://meshtastic.org/docs/configuration/radio/channels/#role): "A hash of the PRIMARY channel's name sets the LoRa frequency slot, which determines the actual frequency you are transmitting on in the band."

Feel free to reach out to the community or check the documentation for more detailed information and troubleshooting tips. Happy Meshing! 🎉
