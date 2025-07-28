'use client'
import React, { useCallback, useState } from 'react'
import { TableOutlined, UploadOutlined } from '@ant-design/icons'
import { Handle, Node, NodeProps, Position, useNodesData, useReactFlow } from '@xyflow/react'
import { Button, Card, Divider, Drawer, Flex, Upload, type UploadProps } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import * as XLSX from 'xlsx'
import { bodyNodeStyle, bodyTitleNodeStyle, cardStyle, drawerButtonStyle, headerIconNodeStyle, headerNodeStyle, headerTitleNodeStyle, sourceHandleStyle } from './node-styles/node-style'
import { RcFile } from 'antd/es/upload'

type ExcelInputNodeData = {
    fileData?: Array<Record<string, any>>,
    fileName?: string
}

type ExcelInputNodeProps = Node<ExcelInputNodeData>

const ExcelInputNode = ({ id, data }: NodeProps<ExcelInputNodeProps>) => {
    const { updateNodeData, deleteElements } = useReactFlow()

    const currentFilename = data?.fileName || 'no content uploaded'
    const isFileUploaded = !!data?.fileName

    const parseCSV = (file: string | ArrayBuffer, filename: string) => {
        if (!file) {
            updateNodeData(id, { data: [], filename: filename })
            return
        }

        try {
            const isCSV = filename.endsWith('.csv')
            const workbook = isCSV
                ? XLSX.read(file, { type: 'string', raw: true })
                : XLSX.read(file, { type: 'binary' })

            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

            const headers = (jsonData[0] as string[]).map((h) => h?.toString().trim() || 0)
            const rows = jsonData.slice(1)

            const formattedData = rows.map((row: any) => {
                const obj: { [key: string]: any } = {}
                headers.forEach((header, index) => {
                    const key = header.toString()
                    obj[key] = row[index]
                })
                return obj
            }).filter(obj => {
                return Object.values(obj).some(val => val !== undefined && val !== '')
            })

            updateNodeData(id, { data: formattedData, filename: filename })
        } catch (err) {
            updateNodeData(id, { data: [], filename: filename })
            console.log(err)
        }
    }

    const UploadProps: UploadProps = {
        accept: 'csv, xls, xlsx',
        beforeUpload: (file: RcFile) => {
            const reader = new FileReader()
            const filename = file.name

            reader.onload = (e) => {
                const fileContent = e.target?.result
                if (fileContent) {
                    parseCSV(fileContent, filename)
                }
            }

            if (filename.toLowerCase().endsWith('.csv')) {
                reader.readAsText(file)
            } else {
                reader.readAsArrayBuffer(file)
            }
            return false
        },
    }

    return (
        <Card style={cardStyle}>
            <Flex justify='start' align='center' gap={5} style={headerNodeStyle}>
                <TableOutlined style={{ ...headerIconNodeStyle, background: '#852FD4' }} />
                <Paragraph style={headerTitleNodeStyle}>File Input</Paragraph>
            </Flex>
            <Divider style={{ margin: '0' }} />
            <Flex align='flex-start' vertical justify='flex-end' gap={3} style={bodyNodeStyle}>
                <Paragraph style={bodyTitleNodeStyle}>Upload File here...</Paragraph>
                <Upload {...UploadProps}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                <p style={{ fontSize: '8px', opacity: '0.8' }}><span style={{ color: 'red' }}>*</span> allowed file : csv, xlsx, xls</p>
            </Flex>
            <Handle type='source' style={{ ...sourceHandleStyle }} position={Position.Right} />
        </Card >
    )
}

export default ExcelInputNode
