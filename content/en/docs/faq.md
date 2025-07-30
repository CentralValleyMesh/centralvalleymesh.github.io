---
title: FAQ
description: A collection of FAQ regarding Meshtastic
date: 2025-07-08
---
## Questions

- [How reliable is this?](#q1)  
- [Do I need a license or tech skills?](#q2)  
- [Where can I get help?](#q3)  
- [How much does this cost?](#q4)  
- [Do I have to use my real name?](#q5)  
- [What does RSSI and SNR mean?](#q6)  
- [How do I choose the right hardware for my node?](#q7)  
- [How do I install or update the Meshtastic firmware?](#q8)  
- [What is Time on Air (ToA) and why does it matter?](#q9)  
- [Can I use Meshtastic without GPS?](#q10)  
- [How secure is my data on Meshtastic?](#q11)  
- [What are the regulatory requirements for using LoRa?](#q12)  
- [How can I extend my node’s battery life?](#q13)  
- [How do I troubleshoot connectivity issues?](#q14)  
- [Can I integrate Meshtastic with other services?](#q15)  
- [How do I contribute to the Meshtastic project?](#q16)  
- [Are third-party antennas supported?](#q17)  
- [How do I reset my node to factory settings?](#q18)  

## Answers

<h3 id="q1">How reliable is this?</h3>  
- Coverage grows as more nodes are introduced into the network. More permanent nodes help the network even more.

<h3 id="q2">Do I need a license or tech skills?</h3>  
- No license is needed at all. Tech know-how is a bonus, but not needed either.

<h3 id="q3">Where can I get help?</h3>  
- Our community on <a href="https://discord.com/invite/9KUu5QQqMx">Discord</a>, or any of the other <a href="https://meshtastic.org/docs/community/local-groups/">Meshtastic communities</a>, or at <a href="https://www.Meshtastic.org">Meshtastic.org</a>.

<h3 id="q4">How much does this cost?</h3>  
- The only cost is the hardware and your time.

<h3 id="q5">Do I have to use my real name?</h3>  
- No. You can remain anonymous if you choose. Just follow the community guidelines or your node will be disabled from the network.

<h3 id="q6">What does RSSI and SNR mean?</h3>  
- Meshtastic gear gives you two key signal stats: RSSI (Received Signal Strength Indicator) and SNR (Signal-to-Noise Ratio).

<h3 id="q7">How do I choose the right hardware for my node?</h3>  
- Select a device with a compatible LoRa radio (for example, ESP32-based boards). Consider battery capacity, form factor, and available GPIOs if you plan to add sensors or buttons.

<h3 id="q8">How do I install or update the Meshtastic firmware?</h3>  
- Use the official Meshtastic mobile app or the command-line tool (`meshtastic-cli`). Connect your node via USB and follow the on-screen prompts to flash the latest release.

<h3 id="q9">What is Time on Air (ToA) and why does it matter?</h3>  
- Time on Air is the duration a packet occupies the radio channel. Longer ToA boosts range but reduces network capacity and battery life, so balance spreading factor with message size.

<h3 id="q10">Can I use Meshtastic without GPS?</h3>  
- Yes. Nodes without GPS will still relay traffic but won’t share location. “Relay only” nodes are often run indoors to bolster outdoor coverage.

<h3 id="q11">How secure is my data on Meshtastic?</h3>  
- All traffic is encrypted end-to-end using Elliptic Curve cryptography. Only nodes sharing the same network key can decrypt messages, protecting your privacy from eavesdroppers.

<h3 id="q12">What are the regulatory requirements for using LoRa?</h3>  
- You generally don’t need an amateur radio license for the low-power bands used by Meshtastic in most countries, but you must comply with local power output and duty-cycle limits.

<h3 id="q13">How can I extend my node’s battery life?</h3>  
- Enable deep-sleep modes, reduce broadcast intervals, lower transmit power, and choose low-quiescent-current regulators. External solar panels or higher-capacity batteries also help.

<h3 id="q14">How do I troubleshoot connectivity issues?</h3>  
- Check RSSI/SNR values, confirm nodes share the same frequency and network key, restart stubborn nodes, and verify firmware versions match across your network.

<h3 id="q15">Can I integrate Meshtastic with other services?</h3>  
- Yes. Use the MQTT bridge, the HTTP API, or custom scripts via `meshtastic-cli` to relay messages into home-automation systems, mapping software, or chat platforms.

<h3 id="q16">How do I contribute to the Meshtastic project?</h3>  
- Head to the GitHub repo to file issues, submit pull requests, translate docs, or join discussions on Discord. Community contributions drive new features and keep the project healthy.

<h3 id="q17">Are third-party antennas supported?</h3>  
- Absolutely. Just ensure the antenna’s connector (for example, SMA, RP-SMA, u.FL) matches your board and that it’s tuned for the 915 MHz (US) or 868 MHz (EU) LoRa bands.

<h3 id="q18">How do I reset my node to factory settings?</h3>  
- Hold the “boot” button while powering on to enter bootloader mode, then use `meshtastic-cli --reset-settings` to clear all custom configs and keys.

<br /><br /><br /><br />