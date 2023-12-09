<!-- <?xml version="1.0" encoding="UTF-8"?> -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
    <xsl:choose>
        <xsl:when test="//catalog/book[@pop='pop']">
        <xsl:for-each select="catalog/book[price=40]">
            <div>
                <span>
                    <xsl:value-of select="price"/>
                </span>
            </div>
        </xsl:for-each>
        </xsl:when>
    </xsl:choose>
</xsl:template>

<!-- вариант от GPT -->
<xsl:template match="/catalog">
    <div>
        <xsl:apply-templates select="//book[@pop='pop' and price=40]"/>
    </div>
</xsl:template>

<xsl:template match="book">
    <span>
        <xsl:value-of select="title"/>
    </span><br/>
</xsl:template>
</xsl:stylesheet>
