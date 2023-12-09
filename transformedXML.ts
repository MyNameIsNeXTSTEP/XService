import { readFileSync, writeFileSync } from 'fs';
import { Xslt, XmlParser } from 'xslt-processor'

export interface ITransformedXML {
    // @todo need later to specify the string subtype as a XML string maybe, somehow
    content: () => string,
    toDisk: (newFilename: string) => void,
};

export class TransformedXML implements ITransformedXML {
    private XMLFilename: string; 
    private XSLTFilename: string;
    private XMLParser: XmlParser;
    constructor(XMLFilename: string, XSLTFilename: string, XMLParser: XmlParser) {
        this.XMLFilename = XMLFilename;
        this.XSLTFilename = XSLTFilename;
        this.XMLParser = XMLParser;
    };
    public content() {
        const XMLFile = readFileSync(`${process.cwd()}/${this.XMLFilename}`, 'utf8');
        const XSLTTransformations = readFileSync(`${process.cwd()}/${this.XSLTFilename}`, 'utf8');
        const trasfomedXML = new Xslt().xsltProcess(
            this.XMLParser.xmlParse(XMLFile),
            this.XMLParser.xmlParse(XSLTTransformations),
        );
        return trasfomedXML;
    }
    public toDisk(newFilename: string) {
        writeFileSync(newFilename, this.content());
    }
};