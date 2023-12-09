import { TransformedXML } from "./transformedXML";
import { XmlParser } from 'xslt-processor'

// @todo: Make a TranformedXML work like a train with provided sequience of XSLTs
const sampleXMLTransormed = new TransformedXML(
    '/XML-samples/sample.xml',
    '/XSLTs/sample.xslt',
    new XmlParser()
);

sampleXMLTransormed.toDisk('newXMLTransformed.xml');