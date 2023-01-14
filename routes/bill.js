const express = require('express');
const PDFDocument = require('pdfkit');
const Order = require("../models/Order");
const router = require("express").Router();

router.get('/:orderId', async (req, res) => {
    const orderId = req.params.orderId;

    // Retrieve the order data from the database or other source
    

    // Set the response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="order.pdf"');
    
    // Create a new PDFDocument instance
    const doc = new PDFDocument();
    doc.pipe(res);

    // Add the order details to the document
    doc.fontSize(20).text('Order Details', {
        underline: true
    });
    doc.moveDown();
    const order = await Order.find({orderid: orderId});
    const orderid = order[0].orderid
    doc.fontSize(15).text("Order ID: ",12);
    console.log(order[0].orderid)
    doc.moveDown();
    doc.fontSize(15).text(`Customer Name: ${order[0].createdAt}`);
    doc.moveDown();
   
    doc.fontSize(15).text(`Order Total: ${order[0].amount}`);
    
    doc.fontSize(20).text('Ordered Items');
    doc.moveDown();
    doc.fontSize(15).text('Item Name | Quantity | Price');
    doc.moveDown();
    // order.products.forEach((item) => {
    //     doc.text(`${item.productName} | ${item.quantity} | ${item.amount}`);
    //     doc.moveDown();
    // });

    // End the document and send it to the client
    doc.end();
});
module.exports = router;