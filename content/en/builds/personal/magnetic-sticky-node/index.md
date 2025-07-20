---
date: 2025-07-16
title: Magnetic Sticky Node
linkTitle: Magnetic Sticky Node
description: A simple node that can be mounted just about anywhere metal and lasts for a couple days on charge
author: CVM Discord user Outsider89
categories: [personal]
tags: [waveshare, battery, portable, magnets]
type: blog
---

This build uses a [Waveshare RP2040-LoRa](https://www.amazon.com/RP2040-LoRa-Development-Integrates-Long-Range-Communication/dp/B0CSFG65MS) board, with a [INA219](https://www.adafruit.com/product/904) for voltage and current monitoring, and a spare 850mAh battery (similar ones found [here](https://www.amazon.com/s?k=3.7V+850mAh+LiPo+battery) and [here](https://www.adafruit.com/category/574)) (that provides about two days of runtime) paired with a [TC4056A battery charging module](https://www.amazon.com/dp/B0C5QS83QK).

This setup is currently using the case that a [Heltec V3 board](https://heltec.org/project/wifi-lora-32-v3/) came in, but will be upgraded to a 3D printed case in time. The magnets were spares, but simmilar ones can be found [here](https://www.amazon.com/s?k=small+magnets+strong&crid=5PRK3IIHVH55&sprefix=small+magnet%2Caps%2C1944&ref=nb_sb_ss_p13n-pd-dpltr-ranker_5_12).

{{< alert title="NOTE" >}}This build is using a [fork](https://github.com/wel97459/firmware-meshtastic) of the main firmware in order to allow the INA219 board to be the voltage sensor.{{< /alert >}}

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
  <div class="col text-center">
    <a href="magnet-build-1.webp" target="_blank">
      {{< imgproc magnet-build-1.webp Resize "300x" >}}
      Mounted on the back of a metal sign near a window on the second story in a building.
      {{< /imgproc >}}
    </a>
  </div>
  <div class="col text-center">
    <a href="magnet-build-2.webp" target="_blank">
      {{< imgproc magnet-build-2.webp Resize "300x" >}}
      Inside of case
      {{< /imgproc >}}
    </a>
  </div>
</div>