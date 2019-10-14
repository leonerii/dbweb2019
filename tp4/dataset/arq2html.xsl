<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">    
<xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="ARQELEM">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Arqueossítio do concelho de <xsl:value-of select="CONCEL"/></title>
                <style>
                    .box {
                        background-color: rgba(255, 255, 255, 0.35);
                        width: 1040px;
                        border: 1px solid black;
                        padding: 50px;
                        margin: auto;
                        margin-block-end: 40px;
                        margin-block-start: 40px;
                    }
                </style>
            </head>
            <body>
                <h1 align="center"><xsl:value-of select="IDENTI"/></h1>
                <h2 align="center">Arqueossítio do concelho de <xsl:value-of select="CONCEL"/></h2>
                
                <br></br>
                <p align="center"><b>Lugar: </b><xsl:value-of select="LUGAR"/></p>
                <p align="center"><b>Freguesia: </b><xsl:value-of select="FREGUE"/></p>
                <p align="center"><b>Concelho: </b><xsl:value-of select="CONCEL"/></p>
                <br></br>
                
                <div class="box">
                    <p><xsl:value-of select="ACESSO"/></p>
                    <p><xsl:value-of select="QUADRO"/></p>
                    <p><xsl:value-of select="DESARQ"/></p>
                </div>
                
                <br></br>
                <h4><b>Bibliografia</b></h4>
                <xsl:apply-templates select="//BIBLIO">
                    <xsl:sort select="."/>
                </xsl:apply-templates>
                <br></br>
                
                <p><b>Autor: </b><xsl:value-of select="AUTOR"/></p>
                <p><b>Data: </b><xsl:value-of select="DATA"/></p>
                
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="//BIBLIO">
        <li><xsl:value-of select="."/></li>
    </xsl:template>
    
</xsl:stylesheet>