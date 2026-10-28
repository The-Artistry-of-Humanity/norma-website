// Cuts the person out of a photo (transparent background), using the subject
// lifting built into macOS 14+ (Vision). Used for the signature photo tiles.
//   swift tools/signature/cutout.swift <photo> <out.png>
import Foundation
import Vision
import CoreImage
import AppKit

let args = CommandLine.arguments
guard args.count == 3, let input = CIImage(contentsOf: URL(fileURLWithPath: args[1])) else {
  FileHandle.standardError.write("usage: swift cutout.swift <photo> <out.png>\n".data(using: .utf8)!); exit(1)
}
let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: input, options: [:])
do {
  try handler.perform([request])
  guard let result = request.results?.first else { FileHandle.standardError.write("no subject found\n".data(using: .utf8)!); exit(2) }
  let buffer = try result.generateMaskedImage(ofInstances: result.allInstances, from: handler, croppedToInstancesExtent: true)
  let ctx = CIContext()
  let out = CIImage(cvPixelBuffer: buffer)
  try ctx.writePNGRepresentation(of: out, to: URL(fileURLWithPath: args[2]), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
  print("cut out", args[2], Int(out.extent.width), "x", Int(out.extent.height))
} catch { FileHandle.standardError.write("\(error)\n".data(using: .utf8)!); exit(3) }
